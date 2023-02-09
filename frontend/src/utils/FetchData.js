import axios from 'axios'


export const postAPI = async (url, post, token) => {
  const res = await axios.post(`/api/v1/${url}`, post, {
    headers: { Authorization: token }
  })

  return res;
}


export const getAPI = async (url, token) => {
  const res = await axios.get(`/api/v1/${url}`, {
    headers: { Authorization: token }
  })

  return res;
}

export const patchAPI = async (url, post, token) => {
  const res = await axios.patch(`/api/v1/${url}`, post, {
    headers: { Authorization: token }
  })

  return res;
}


export const putAPI = async (url, post, token) => {
  const res = await axios.put(`/api/v1/${url}`, post, {
    headers: { Authorization: token }
  })

  return res;
}


export const deleteAPI = async (url, token) => {
  const res = await axios.delete(`/api/v1/${url}`, {
    headers: { Authorization: token }
  })

  return res;
}