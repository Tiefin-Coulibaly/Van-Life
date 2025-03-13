import bcrypt from "bcrypt"

export const saltAndHashPassword = async (userPassword:string):Promise<string> => {
    const pwdHash = await bcrypt.hash(userPassword, 10)
    return pwdHash
}

export const getUserFromDb = async (userEmail:string, userHashedPassword:string) => {
    
}