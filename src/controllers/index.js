const { File, Chunk, News, Event, Images, Users, Structure } = require("../db/model");
const { hasingPass, comparePass } = require("../helpers/securePass");
const getfiles = require("../helpers/getfiles");
const { generateToken } = require("../helpers/jwt");

const getImages = async (req, res, next) => {
  try {
    const image = await Images.find({});
    res.status(200).json(image);
  } catch (err) {
    next({
      code: 404,
      message: 'Data not found'
    })
  }
};

const getNews = async (req, res, next) => {
  try {
    const news = await News.find({});
    res.status(200).json(news);
  } catch (err) {
    next({
      code: 404,
      message: 'Data not found'
    })
  }
};

const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find({});
    res.status(200).json(events);
  } catch (err) {
    next({
      code: 404,
      message: 'Data not found'
    })
  }
};

// POST

const postImage = async (req, res, next) => {
  const { id } = req.file
  try {
    const success = await Images.create({ files_id: id })
    res.status(201).json('Success Add Image')
  } catch (error) {
    next({
      code: 400,
      message: 'Bad Request'
    })
  }
};

const viewImage = async (req, res, next) => {
  const { id } = req.params;
  try {
    const found = await File.findById(id);
    const { filename } = found;
    const image = await getfiles(filename);
    image.on("data", function (data) {
      return res.status(200).write(data);
    });
    image.on("error", function (err) {
      return res.status(404).send({ message: "Cannot read Image!" });
    });
    image.on("end", () => {
      return res.end();
    });
  } catch (err) {
    next({
      code: 404,
      message: 'Data not found'
    })
  }
};

const createNews = async (req, res, next) => {
  try {
    if (req.file === undefined) {
      throw {
        code: 400,
        message: 'file is empty'
      }
    }
    const { id, filename } = req.file;
    const { title, content } = req.body;
    if (content === undefined || title === undefined) {
      await File.deleteOne({ filename });
      await Chunk.deleteMany({ files_id: id });
      throw {
        code: 400,
        message: "Title or content are empty"
      }
    }
    const buf = Buffer.from(content, "utf-8");
    const payload = {
      title,
      img: id,
      content: buf,
    };
    await News.create(payload);
    res.status(201).json("Success Added News");
  } catch (err) {
    const message = err.message || err.errors.title.properties.message;
    next({
      code: 404,
      message,
    });
  }
};

const createEvent = async (req, res, next) => {
  const { id } = req.file;
  const { title, content, time } = req.body;
  const buf = Buffer.from(content, "utf-8");
  const payload = {
    title,
    img: id,
    content: buf,
    time,
  };
  try {
    await Event.create(payload);
    res.status(200).json("Success Added News");
  } catch (err) {
    const message = err.errors || "Error";
    await File.deleteOne({ filename });
    await Chunk.deleteOne({ files_id: req.file.id });
    next({
      code: 404,
      message,
    });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (email === undefined) {
      throw {
        code: 400,
        message: 'Please Input your email'
      }
    } else if (email.length === 0 || password.length === 0) {
      throw {
        code: 400,
        message: 'Please Input your email'
      }
    }
    const findData = await Users.findOne({ email })
    if (findData === null) {
      throw {
        code: 404,
        message: "Email or password are wrong",
      };
    }
    if (findData.length === 0) {
      throw {
        code: 404,
        message: "Email or password are wrong",
      };
    } else {
      const truePass = comparePass(password, findData.password);
      if (!truePass) {
        throw {
          code: 404,
          message: "Email or password are wrong",
        };
      } else {
        res.status(200).json({ token: generateToken(email), role: findData.role });
      }
    }
  } catch (err) {
    next(err)
  }
};

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const hass = hasingPass(password);
  const payload = {
    email,
    password: hass,
    role: "member",
  };
  try {
    const find = await Users.find({ email });
    if (find.length !== 0) {
      throw {
        code: 400,
        message: "Data already exits",
      };
    } else {
      const create = await Users.create(payload);
      res.status(201).json("User has been created");
    }
  } catch (err) {
    next(err);
  }
};

const scholarship = async (req, res, next) => {
  try {
    res.status(200).json('scholarshoip')
  } catch (err) {
    next({
      code: 404,
      message: 'Data not found'
    })
  }
}

const dataSupport = (req, res, next) => {
  try {
    res.status(200).json('data support')
  } catch (err) {
    next({
      code: 404,
      message: 'Data not found'
    })
  }
}

const destroyData = async (req, res, next) => {
  const id = req.params.id
  try {
    const found = await News.findById(id)
    if (!found) {
      throw {
        code: 404,
        message: 'Data not found'
      }
    }
    const findImage = await File.findById(found.img)
    await File.deleteOne({ filename: findImage.filename })
    await Chunk.deleteMany({ files_id: found.img })
    await News.deleteOne({ _id: id })
    res.status(200).json('success deleted')
  } catch (err) {
    next(err)
  }
}

const editData = async (req, res, next) => {
  const id = req.params.id
  const { title, content } = req.body
  const buf = Buffer.from(content, "utf-8");
  try {
    const found = await News.findById(id)
    if (!found) {
      throw {
        code: 404,
        message: 'Data not found'
      }
    }
    else {
      const payload = {
        title,
        content: buf
      }
      await News.updateOne({ _id: id }, payload)
      res.status(200).json('updated success')
    }
  } catch (err) {
    next(err)
  }
}

const destroyImage = async (req, res, next) => {
  const id = req.params.id
  try {
    const findImage = await Images.findOne({ files_id: id })
    if (!findImage) {
      throw {
        code: 404,
        message: "Image not found"
      }
    }
    const imageId = findImage.files_id
    await Images.deleteOne({ _id: findImage._id })
    await File.findByIdAndDelete(imageId)
    await Chunk.deleteMany({ files_id: imageId })
    res.status(200).json("Success Deleted Image")
  } catch (err) {
    next(err)
  }
}

const editEvent = async (req, res, next) => {
  const id = req.params.id
  const { title, time, content } = req.body
  const buf = Buffer.from(content, "utf-8");
  try {
    const found = await Event.findById(id)
    if (!found) {
      throw {
        code: 404,
        message: 'Data not found'
      }
    }
    else {
      const payload = {
        title,
        time,
        content: buf
      }
      await Event.updateOne({ _id: id }, payload)
      res.status(200).json('updated success')
    }
  } catch (err) {
    next(err)
  }
}

const destroyEvent = async (req, res, next) => {
  const id = req.params.id
  try {
    const found = await Event.findById(id)
    if (!found) {
      throw {
        code: 404,
        message: 'Data not found'
      }
    } else {
      await Event.deleteOne({ _id: id })
      await File.findByIdAndDelete(found.img)
      await Chunk.deleteMany({ files_id: found.img })
      res.status(200).json('Success Deleted')
    }
  } catch (err) {
    next(err)
  }
}

const dataStructure = async (req, res, next) => {
  try {
    const data = await Structure.find({})
    res.status(200).json(data)
  } catch (err) {
    next({
      code: 404,
      message: 'Data not found'
    })
  }
}

const createStructure = async (req, res, next) => {
  try {
    const {
      field,
      description,
      content,
    } = req.body
    const { id } = req.file
    const buf = Buffer.from(content, 'utf-8')
    const created = await Structure.create({
      field,
      description,
      content: buf,
      img: id
    })
    res.status(201).json(created)
  } catch (err) {
    next(err)
  }
}

const destroyStructure = async (req, res, next) => {
  const { id } = req.params
  try {
    const found = await Structure.findById(id)
    if (!found) {
      throw {
        code: 404,
        message: "Data not found"
      }
    } else {
      await Structure.deleteOne({ _id: id })
      await File.findByIdAndDelete(found.img)
      await Chunk.deleteMany({ files_id: found.img })
      res.status(200).json('Success delete data')
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getImages,
  getNews,
  getEvents,
  postImage,
  viewImage,
  createNews,
  createEvent,
  login,
  register,
  scholarship,
  dataSupport,
  destroyData,
  editData,
  destroyImage,
  editEvent,
  destroyEvent,
  dataStructure,
  createStructure,
  destroyStructure
};
