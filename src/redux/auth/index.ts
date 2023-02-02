import { createSlice } from '@reduxjs/toolkit';
import { ToastAndroid } from 'react-native';
// Files
import { login } from '../../api/auth';
import { strings } from '../../constants';
import { loginSchema } from '../../utils/domUtils';
import { setLoading } from '../common';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth: false,
    user_data: null,
    token: null,
  },
  reducers: {
    setUserData(state, action) {
      state.user_data = action.payload;
    },
    logOut(state) {
      state.auth = false;
      state.token = null;
      state.user_data = null;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});
//   return async (dispatch: any) => {
//     if (!data.email.trim() || !data.password.trim()) {
//       return dispatch(
//         updatedShowModal({
//           show: true,
//           message: strings.common.fill_all_fields,
//           type: 'error',
//         })
//       );
//     }
//     if (!checkEmail(data.email)) {
//       return dispatch(
//         updatedShowModal({
//           show: true,
//           message: strings.common.valid_email,
//           type: 'error',
//         })
//       );
//     }
//     if (!checkPassword(data.password)) {
//       return dispatch(
//         updatedShowModal({
//           show: true,
//           message: strings.common.valid_password,
//           type: 'error',
//         })
//       );
//     }

//     try {
//       dispatch(setLoading(true));
//       const res = await login(apiCall, data);
//       if (res.responseCode === 200) {
//         dispatch(updatedAuthState(res.data));
//         dispatch(setTokens(res.data.jwtToken));
//       } else {
//         return dispatch(
//           updatedShowModal({
//             show: true,
//             message: res?.failureMsg ? res.failureMsg : res.successMsg,
//             type: 'error',
//           })
//         );
//       }
//     } catch (error: any) {
//       dispatch(
//         updatedShowModal({
//           show: true,
//           message: error.message,
//           type: 'error',
//         })
//       );
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };
// };

export const loginManager = (apiCall: any, data: any) => {
  return async (dispatch: any) => {
    let result = loginSchema(data);
    try {
      dispatch(setLoading(true));
      if (result) {
        // let url = `/auth/login?username=${result.username}&password=${result.password}`;
        // let url = `/auth/login`;
        const res = await login(apiCall, result);
        console.log('res', res);
        if (res.isSuccess) {
          dispatch(setUserData(res.AccountDetail));
          dispatch(setToken({ access_token: res.sessionId }));
        } else {
          return ToastAndroid.show(strings.invalidCredentials, ToastAndroid.SHORT);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const { setUserData, logOut, setToken } = authSlice.actions;

export default authSlice.reducer;
