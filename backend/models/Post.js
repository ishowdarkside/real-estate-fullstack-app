const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "creatorType",
    },
    creatorType: {
      type: "string",
      enum: ["User", "Agency"],
    },
    title: {
      type: "string",
      required: [true, "Upišite naslov vaše objave"],
      minlength: [8, "Naslov mora sadržavati bar 8 karaktera"],
      maxlength: [90, "Naslov može sadržavati samo 60 karaktera"],
    },
    subtitle: {
      type: "string",
      required: [true, "Upišite podnaslov vaše objave"],
      minlength: [8, "Podnaslov mora sadržavati bar 8 karaktera"],
      maxlength: [90, "Podnaslov može sadržavati samo 60 karaktera"],
    },
    description: {
      type: "string",
      required: [true, "Unesite opis vaše objave"],
      minlength: [10, "Opis mora sadržavati bar 10 karaktera"],
    },
    price: {
      type: Number,
      required: [true, "Unesite cijenu vaše nekretnine"],
    },
    imgs: [
      {
        type: String,
      },
    ],
    location: {
      type: "string",
      required: [true, "Molim vas označite gdje je objekat lociran"],
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
    novogradnja: {
      type: Boolean,
    },
    namjesten: {
      type: Boolean,
    },
    grijanje: {
      type: "string",
      required: [true, "Označite vrstu grijanja"],
      enum: ["plin", "centralno", "bez grijanja"],
    },
    roomNum: {
      required: [true, "Označite koliko ima soba"],
      type: Number,
    },
    vrstaOglasa: {
      type: "string",
      required: [true, "Označite vrstu oglasa!"],
      enum: ["prodaja", "izdavanje"],
    },
    sprat: {
      type: Number,
    },
    kvadrata: {
      required: [true, "Unesite broj kvadrata"],
      type: Number,
    },
    garage: {
      required: [true, "Unesite da li nekretnina ima garažu"],
      type: Boolean,
    },
    indexed: {
      required: [true, "Unesite da li je nekretnina uknjižena"],
      type: Boolean,
    },
    tipNekretnine: {
      type: "string",
      enum: ["kuća", "stan"],
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    coords: {
      type: [String],
      required: [true, "Označite na mapi gdje se nalazi vaš objekat"],
    },
    finished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
