import { Schema, model } from "mongoose";


export const contactSchema = new Schema(
    {
         
        name: {
            type: String,
            required: [true, 'Set name for contact'],
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
         owner: {
                type: Schema.Types.ObjectId,
             ref: 'user',
            // required: true,
    }
    }
);

contactSchema.post("save", (error, data, next) => {
    error.status = 400;
    next();
    
})

export const Contact = model("contact", contactSchema);
