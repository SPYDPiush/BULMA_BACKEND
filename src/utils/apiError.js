class apiError extends Error{

  constructor(status,message){

    super(message)
    this.status = status
  }
}

export {apiError}