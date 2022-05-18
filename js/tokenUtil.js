const getTokenPayload = token => {
    const parts = token
      .split('.')
      .map(part =>
        Buffer.from(
          part.replace(/-/g, '+').replace(/_/g, '/'),
          'base64',
        ).toString(),
      );
    return JSON.parse(parts[1]);
  };

const helloworld = ()=>{
    console.log('Hola mundo');
}

export {helloworld, getTokenPayload};
//usar default cuando solo voy a hacer una exportación
//No usar default si voy a hacer varias exportaciones

