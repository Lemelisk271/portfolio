import { csrfFetch } from './csrf'

const SET_USER = 'session/setUser'
const REMOVE_USER = 'session/removeUser'

const setUser = (user) => {
  return {
    type: SET_USER,
    user
  }
}

const removeUser = () => {
  return {
    type: REMOVE_USER
  }
}

export const login = (user) => async (dispatch) => {
  const {credential, password} = user
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password
    })
  })
  const data = await response.json()
  dispatch(setUser(data.user))
  return response
}

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch('/api/session')
  const data = await response.json()
  dispatch(setUser(data.user))
  return response
}

export const signup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = user
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password
    })
  })
  const data = await response.json()
  dispatch(setUser(data.user))
  return response
}

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE'
  })
  dispatch(removeUser())
  return response
}

export const updateUser = (id, user) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
  if (response.ok) {
    const data = await response.json()
    dispatch(setUser(data.user))
    return null
  } else if (response.status < 500) {
    const data = await response.json()
    if (data.errors) {
      return data.errors
    }
  } else {
    return {message: "An Error Occurred, Please try Again."}
  }
}

export const updateImage = (id, body) => async (dispatch) => {
  const { image } = body
  const formData = new FormData()
  formData.append("image", image)
  const res = await csrfFetch(`/api/images/${id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: formData
  })
  if (res.ok) {
    const data = res.json()
    dispatch(setUser(data.user))
  } else if (res.status < 500) {
    const data = await res.json()
    if (data.errors) {
      return data.errors
    }
  } else {
    return {message: "An Error Occurred, Please try Again."}
  }
}

const initialState = { user: null }

const sessionReducer = (state = initialState, action) => {
  let newState
  switch (action.type) {
    case SET_USER:
      newState = { ...state }
      newState.user = action.user
      return newState
    case REMOVE_USER:
      newState = { ...state }
      newState.user = null
      return newState
    default:
      return state
  }
}

export default sessionReducer
