# **API DOCUMENTATION** 

## **_BASE URL_**
```
                        http://localhost:3001/api
```

@ _User = member_

### **Method**
```
                            GET | POST
```
+ ***GET {baseurl}/images***

#### Request Header
```
                                None
```
#### Request Params
```
                                None
```
#### Request Body
```
                                None
```
#### *Response*
```
Image on
```
+ ***GET {baseurl}/news***

#### Request Header
```
                                None
```
#### Request Params
```
                                None
```
#### Request Body
```
                                None
```
#### *Response*
```
{
    [Data],
    ...
}
```
+ ***GET {baseurl}/event***

#### Request Header
```
                                None
```
#### Request Params
```
                                None
```
#### Request Body
```
                                None
```
#### *Response*
```
{
    [Data],
    ...
}
```
+ ***GET {baseurl}/news***

#### Request Header
```
                                None
```
#### Request Params
```
                                 ID
```
#### Request Body
```
                                None
```
#### *Response*
```
{
    id : ObjectID,
    title : String,
    Image : Array,
    content : String.
    PostDate : Date,
}
```
+ ***GET {baseurl}/news***

#### Request Header
```
                                None
```
#### Request Params
```
                                 ID
```
#### Request Body
```
                                None
```
#### *Response*
```
{
    id : ObjectID,
    title : String,
    Image : Array,
    content : String.
    executionTime : Date,
}
```
+ ***POST {baseurl}/login***

#### Request Header
```
                                None
```
#### Request Params
```
                                None
```
#### Request Body
```
                        {
                            email : Email,
                            password : String
                                                }
```
#### *Response*
```
accessToken
```
+ ***GET {baseurl}/library***

#### Request Header
```
                    {
                        accessToken : String
                                                }
```
#### Request Params
```
                                None
```
#### Request Body
```
                                None
```
#### *Response*
```
Go to google drive library perhimagi
```
+ ***GET {baseurl}/dataSupport***

#### Request Header
```
                    {
                        accessToken : String
                                                }
```
#### Request Params
```
                                None
```
#### Request Body
```
                                None
```
#### *Response*
```
{
    scholarship : Array,
    programe : {},
    history : {},
}
```
+ ***GET {baseurl}/organizationStructure***

#### Request Header
```
                    {
                        accessToken : String
                                                }
```
#### Request Params
```
                                None
```
#### Request Body
```
                                None
```
#### *Response*
```
{
    [
        title : String,
        data : {}
    ],
    ...
}
```