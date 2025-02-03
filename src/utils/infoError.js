export const generatePetErrorInfo = (pet) =>{
    return `One or more properties were incomplete or not valid. 
    List of required properties: 
        name: needs to be a string ${pet.name}
        specie:needs to be a string ${pet.specie}
        birthdate: needs to be a string ${pet.birthdate}`
}