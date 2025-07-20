export const isValidPh = (num) => {
  if (!/^(9|8|7|6)[\d]{9,9}$/.test(num.trim()))
    throw new Error("Enter a valid mobile number");
};

export const isValidName = (name) => {
  if (/[^a-zA-Z.\s]/.test(name)) 
    throw new Error("Enter a Valid Name");
};

export const isValidRollNo = (roll_no) => {
  const yearSuffix = new Date().getFullYear().toString().slice(-2);
  const regex = new RegExp(`^${yearSuffix}FTC(9|1[0-2])\\d{2}$`);
  if (!regex.test(roll_no))
    throw new Error("Invalid Roll:No");
};

export const isValidFeeRupee = (rupee) => {
  if (isNaN(rupee)) 
    throw new Error("Enter the correct amount");
};

export const isValidPwd = (pass) => {
  if (/^[^a-z]*$/.test(pass)) {
    throw new Error("Password should contain atleast one lowercase");
  } else if (/^[^A-Z]*$/.test(pass)) {
    throw new Error("Password should contain atleast one uppercase");
  } else if (/^[^\d]*$/.test(pass)) {
    throw new Error("Password should contain atleast one digit");
  } else if (/^[A-Za-z0-9]*$/.test(pass)) {
    throw new Error("Password should contain atleast one speacial character");
  } else if (!/^.{6,15}$/.test(pass)) {
    throw new Error("Password must be 6 - 15 characters long");
  }
};

export const isPwdMatch = (pass1, pass2) => {
  if (pass1 !== pass2) 
    throw new Error("Confirm Password doesn't match the password");
};
