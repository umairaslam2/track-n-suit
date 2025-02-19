import axios from "axios";
const URL = "http://localhost:5000/api/";
import { getSessionId } from '@/utils/session';
export const LoginUser = async (route, data) => {
  const config = {
    url: URL + route,
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    data: data,
    // withCredentials: true, 
  };
  try {
    const res = await axios.request(config);
    return res.data

  } catch(err) {
    return err?.response?.data
  }
}

export const productAdd = async (route, data, token) => {
  const config = {
    url: URL + route,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      // Authorization: `Bearer ${token}`,

    },
    data: data,
    // withCredentials: true, 
    
  };
  try {
    const res = await axios.request(config);
    return res.data

  } catch(err) {
    return err.response.data
  }
}

export const AddCategory = async (route, data) => {
  const config = {
    url: URL + route,
    method: "POST",
    headers: {
     "Content-Type": "application/json",
     Authorization: `Bearer ${token}`,

    },
    data: data,
  };
  try {
    const res = await axios.request(config);
    return res.data

  } catch(err) {
    return err.response.data
  }
}


export const getAllProducts = async (route) => {
  const config = {
  url: URL + route,
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    // credentials: 'include',
  }
};
try {
  const res = await axios.request(config);
  return res.data
} catch(err) {
  return err.response.data
}
};
export const getSingleProducts = async (route) => {
  const config = {
  url: URL + route,
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  }
};
try {
  const res = await axios.request(config);
  return res.data
} catch(err) {
  return err.response.data
}
};
// update  product
export const EditProduct = async (route,  data ) => { 
  console.log("API call time data ",data)
  const config = {
    url: URL + route, 
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: data
  };

  try {
    const res = await axios.request(config);
    return res.data;
  } catch (err) {
    return err.response ? err.response.data : { error: "Network error" };
  }
};


export const DeleteProduct = async (route) => {
  const config = {
  url: URL + route,
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${token}`,
  }
};
try {
  const res = await axios.request(config);
  return res.data
} catch(err) {
  return err.response.data
}
};


// add to cart post request 
export const AddToCart = async (productId, quantity, route) => {
  const sessionId = getSessionId();

  const config = {
    url: URL + route,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "sessionId" : sessionId,
    },
    data: {
      productId,
      quantity,
    },
  };

  try {
    const response = await axios.request(config);
    return response
  } catch (error) {
    console.log("error", error);
  }
};

// get cart 

export const getCartItem = async (route, id) => {
  const config = {
  url: URL + route,
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "sessionId" : id,
  }
};
try {
  const res = await axios.request(config);
  return res.data
} catch(err) {
  return err.response.data
}
};

// buy now 
export const BuyNow = async (data, route) => {
  const sessionId = getSessionId();
  const config = {
    url: URL + route,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "sessionId" : sessionId,
    },
    data: data
  };

  try {
    const response = await axios.request(config);
    return response
    
  } catch (error) {
    console.error("API Error:", error);
    if (error.response) {
      console.error("Response Error Data:", error.response.data);
      console.error("Response Status:", error.response.status);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up the request:", error.message);
    }
  }
};
// delete cart item 
export const DeleteCart = async ( productId ,route) => {
  const sessionId = getSessionId();
  const config = {
  url: URL + route,
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    "sessionId" : sessionId,
  },
  data:{
    sessionId: sessionId,
    productId: productId,
  }
  
};
try {
  const res = await axios.request(config);
  return res.data
} catch(err) {
  return err.response.data
}
};

// edit cart items

export const EditCart = async (productId , route,  quantity ) => { 
  const sessionId = getSessionId();
  const config = {
    url: URL + route, 
    method: "PUT",
    headers: {
     "Content-Type": "application/json",
      "sessionId" : sessionId,
    },
    data:{
        sessionId: sessionId,
        productId: productId,
        quantity
    }
  };

  try {
    const res = await axios.request(config);
    return res.data;
  } catch (err) {
    return err.response ? err.response.data : { error: "Network error" };
  }
};

// get cart 

export const getAllCartItem = async (route) => {
  const config = {
  url: URL + route,
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  }
};
try {
  const res = await axios.request(config);
  return res.data
} catch(err) {
  return err.response.data
}
};

// email notify 
export const emailNotify = async (data, route) => {

  const config = {
    url: URL + route,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: data
  };

  try {
    const response = await axios.request(config);
    return response
    
  } catch (error) {
    console.error("API Error:", error);
    if (error.response) {
      console.error("Response Error Data:", error.response.data);
      console.error("Response Status:", error.response.status);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up the request:", error.message);
    }
  }
};
// edit order 
export const EditOrder = async (data , route, ) => {
  const config = {
    url: URL + route, 
    method: "PUT",
    headers: {
     "Content-Type": "application/json",
    },
    data:{
        status: data,
    }
  };

  try {
    const res = await axios.request(config);
    return res.data;
  } catch (err) {
    return err.response ? err.response.data : { error: "Network error" };
  }
};

