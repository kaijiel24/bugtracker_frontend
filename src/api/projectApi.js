import { authAxios } from "./authApi"

export const getProjectListFn = async (value) => {
    const response = await authAxios.get('api/projectlist')
    return response.data
}

