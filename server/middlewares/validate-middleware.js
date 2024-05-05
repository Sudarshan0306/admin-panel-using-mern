const validate = schema => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body)
    req.body = parseBody
    next()
  } catch (err) {
    // console.log(err);
    // const message = err.errors[0].message
    // // for (i = 0; i < err.errors.length; i++) {
    // //     message[i] = err.errors[i]['message'];
    // //     console.log(message);
    // //     res.status(400).json({ msg: message })
    // // }
    // res.status(400).json({ msg: message })

    const status = 400
    message = 'fill the inputs properly'
    const extraDetails = err.errors[0].message

    const error = {
      status,
      message,
      extraDetails
    };

    console.log(error);
    
    next(error)
  }
}

module.exports = validate
