const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const agencySchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: "Agency",
    },
    agencyName: {
      type: "string",
      required: [true, "Unesite ime agencije!"],
    },
    contactPerson: {
      type: "string",
      required: [true, "Molim vas unesite ime kontakt osobe"],
      validate: {
        validator: function (val) {
          return val.match(/^[A-Za-z\s]+$/);
        },
        message: "Ime kontakt osobe može sadržavati samo karaktere",
      },
    },
    about: {
      type: String,
    },
    email: {
      type: "string",
      unique: [true, "Uneseni email je već u upotrebi."],
      required: [true, "Molim vas unesite email!"],
      validate: {
        validator: (val) => val.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
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
    instagram: {
      type: "string",
    },
    website: {
      type: "string",
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    reviews: [
      {
        reviewType: {
          type: String,
          enum: ["positive", "negative"],
        },
        reviewer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

agencySchema.statics.checkFields = function checkFields(body) {
  if (
    !body.agencyName ||
    !body.contactPerson ||
    !body.email ||
    !body.password ||
    !body.passwordConfirm
  ) {
    return false;
  } else return true;
};

agencySchema.method("hasChangedPassword", function () {
  if (!this.passwordChangedAt) return false;
  const now = new Date().getTime();
  const timestamp = new Date(this.passwordChangedAt).getTime();
  return timestamp > now;
});

agencySchema.pre("save", async function (next) {
  if (!this.isNew) return next();
  this.passwordConfirm = undefined;
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Agency = mongoose.model("Agency", agencySchema);

module.exports = Agency;
