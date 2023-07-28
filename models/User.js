const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: "string",
    required: [true, "Molim vas unesite puno ime i prezime!"],
    minlength: [
      5,
      "Ime i prezime se mora sačinjavati iz minimalno 5 karaktera!",
    ],
    maxlength: [30, "ime i prezime ne može sadržavati više od 30 karaktera"],
    validate: [
      {
        validator: (val) => val.match(/^[A-Za-z\s]+$/),
        message: "Ime i prezime može sadržavati samo karaktere!",
      },
      {
        validator: (val) => val.split(" ")?.length > 1,
        message: "Molim vas, unesite puno ime i prezime!",
      },
    ],
  },
  location: {
    type: "string",
    required: [true, "Molim vas označite mjesto stanovanja"],
    enum: [
      "bihać",
      "sarajevo",
      "mostar",
      "prijedor",
      "cazin",
      "trebinje",
      "tuzla",
      "banja luka",
      "zenica",
      "gradačac",
      "živinice",
      "gračanica",
      "zvornik",
      "doboj",
      "srebrenik",
      "livno",
      "konjic",
      "istočno sarajevo",
      "bijeljina",
      "gradiška",
      "visoko",
      "zavidovići",
      "bosanska krupa",
      "goražde",
      "lukavac",
      "laktaši",
      "novi grad",
      "široki brijeg",
      "čapljina",
      "derventa",
      "ravno",
      "orašje",
      "foča",
      "šipovo",
      "stolac",
      "travnik",
      "ljubuški",
      "brčko",
      "mrkonjić grad",
      "bileća",
      "prnjavor",
      "sanski most",
      "bugojno",
      "kiseljak",
      "kakanj",
      "velika kladuša",
      "prozor rama",
      "novi travnik",
      "odžak",
      "neum",
    ],
  },
  email: {
    type: "string",
    required: [true, "Molim vas unesite email!"],
    validate: {
      validator: (val) => val.test(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      message: "Neispravna email adresa",
    },
  },
  password: {
    type: "string",
    required: [true, "Unesite lozinku"],
    minlength: [6, "Lozinka mora da sadrži minimalno 6 karaktera"],
    maxlength: [30, "Lozinka može da sadrži maksimalno 30 karaktera"],
  },
  passwordConfirm: {
    type: "string",
    required: [true, "Unesite ponovno lozinku"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Lozinke se ne poklapaju!",
    },
  },
  phoneNumber: {
    type: "string",
    validate: {
      validator: (val) => val.match(/^\+?\d{1,3}[\s-]?\d{1,5}[\s-]?\d{1,9}$/),
      message: "Neispravan broj telefona",
    },
  },
});

userSchema.statics.checkFields = function checkFields(body) {
  if (
    !body.fullName ||
    !body.location ||
    !body.email ||
    !body.password ||
    !body.passwordConfirm
  )
    return false;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
