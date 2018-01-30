import Cookies from 'js-cookie';
import axios from 'axios'

const user = {
  state: {
    id: null,
    username: null,
    email: null,
    avatar: null,
    mobile: null,
    token: null,
    remark: null,
    auth: false,
  },
  mutations: {
    // 用户登录成功，存储 token 并设置 header 头
    logined(state, token) {
      state.auth = true
      state.token = token
      localStorage.token = token
    },
    // 用户刷新 token 成功，使用新的 token 替换掉本地的token
    refreshToken(state, token) {
      state.token = token
      localStorage.token = token
      axios.defaults.headers.common['Authorization'] = state.token
    },
    // 登录成功后拉取用户的信息存储到本地
    profile(state, data) {
      state.id = data.id
      state.username = data.username
      state.email = data.email
      state.mobile = data.mobile
      state.avatar = data.avatar
      state.remark = data.remark
    },
    // 用户登出，清除本地数据
    logout (state, vm) {
      Cookies.remove('user');
      Cookies.remove('password');
      Cookies.remove('access');

      state.name = null
      state.mobile = null
      state.avatar = null
      state.remark = null
      state.auth = false
      state.token = null

      localStorage.removeItem('token')

      // 恢复默认样式
      let themeLink = document.querySelector('link[name="theme"]');
      themeLink.setAttribute('href', '');
      // 清空打开的页面等数据，但是保存主题数据
      let theme = '';
      if (localStorage.theme) {
        theme = localStorage.theme;
      }
      localStorage.clear();
      if (theme) {
        localStorage.theme = theme;
      }
    }
  },
  actions: {
    // 登录成功后保存用户信息
    logined({dispatch, commit}, token) {
      return new Promise(function (resolve, reject) {
        commit('logined', token)
        axios.defaults.headers.common['Authorization'] = token
        dispatch('profile').then(() => {
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    // 登录成功后使用 token 拉取用户的信息
    profile({commit}) {
      return new Promise(function (resolve, reject) {
        axios.get('/api/profile', {}).then(respond => {
          if (respond.success == 1) {

            commit('profile', respond.data)
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    // 用户登出，清除本地数据并重定向至登录页面
    logout({commit}) {
      return new Promise(function (resolve, reject) {
        commit('logout')
        axios.post('auth/logout', {}).then(respond => {
          Vue.$router.push({name: 'login'})
        })
      })
    },
    // 将刷新的 token 保存至本地
    refreshToken({commit}, token) {
      return new Promise(function (resolve, reject) {
        commit('refreshToken', token)
      })
    },
  }
};

export default user;
