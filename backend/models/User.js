const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "이메일을 작성해주세요."],
            unique: true,
            validate: {
                validator: function (v) {
                  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: (props) => "이메일 주소가 유효하지 않습니다",
              },
        },

    password: {
      type: String,
      required: [true, "비밀번호를 작성해주세요."],
      validate: {
        validator: function (v) {
          return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/.test(
            v
          );
        },
        message: (props) =>
          "8~16자 영문 대 소문자 / 숫자 / 특수문자를 사용하세요",
      },
    },
    
    isAdmin: {
      type: Boolean,
      default: false,
    }
        
  },
  {timestamps: true}
)

UserSchema.pre("save", function (next) {
  this.password = CryptoJS.AES.encrypt(
    this.password,
    process.env.PASSWORD_SECRET_KEY
  ).toString();
  next();
});

UserSchema.methods.isPasswordMatch = function (currentPassword) {
  const hashedPassword = CryptoJS.AES.decrypt(
    this.password,
    process.env.PASSWORD_SECRET_KEY
  );
  return hashedPassword.toString(CryptoJS.enc.Utf8) === currentPassword;
};

module.exports = mongoose.model("User", UserSchema);