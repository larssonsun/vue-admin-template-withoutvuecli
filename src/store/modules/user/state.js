import { getToken } from '@/utils/auth'

const state = {
    token: getToken(),
    name: '',
    avatar: ''
}

export default state