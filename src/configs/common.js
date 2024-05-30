
const rm=(res,code,message,data={})=>{
    res.send({
        status:code,
        message:message,
        data:data,
    })
}
const badReq=(res,code =400,message="Bad Request")=>{
    res.send({
        status:code,
        message:message,
    })
}
const noContent=(res)=>{
    res.send({
        status:204,
        data:{},
    })
}
const InternalServerError=(res)=>{
    res.send({
        status:500,
        message:"Something went wrong",
        data:{},
    })
}
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body || req.query || req.params, { abortEarly: false });
        if (error) {
          const errorMessage = error.details.map(detail => detail.message).join(', ');
          return res.status(400).json({ message: errorMessage });
        }
        next();
      };
  };

module.exports={
    rm,
    noContent,
    InternalServerError,
    badReq,
    validate
}