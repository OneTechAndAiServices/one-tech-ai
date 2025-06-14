// import mongoose from 'mongoose';

// const noticeSchema = new mongoose.Schema(
//   {
//     heading: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//   },
//   {
//     timestamps: true, // Automatically adds createdAt and updatedAt
//   }
// );

// // Export model (avoids re-compiling if already defined)
// export default mongoose.models.Notice || mongoose.model('Banner', noticeSchema);
import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Banner  || mongoose.model('banner', noticeSchema);
