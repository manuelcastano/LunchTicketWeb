const post = async (url, data)=>{
    let response = await fetch(
        BASEURL + url,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      return response;
}

const get = async (url)=>{
    let response = await fetch(
        BASEURL + url,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        }
      );
      return response;
}


export {post, get};