"use client";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";

import customFetch from "@/lib/axios";

const schema = z.object({
    full_name: z
        .string()
        .min(3, { message: "Must be 3 or more characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    note_inq: z.string(),
});

const ContactForm = ({ lang, form_info }) => {
    const [captchaToken, setCaptchaToken] = useState(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: zodResolver(schema) });

    const onCaptchaChange = (token) => {
        setCaptchaToken(token);
    };

    const onSubmit = async (data) => {
        if (!captchaToken) {
            console.error("Please complete the reCAPTCHA");
            return;
        }
        try {
            const Message = `
            
            <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; border: 2px solid #ccc; border-radius: 10px;">
                <ul style="list-style-type: none; padding: 10px;">
                    <li style="margin-bottom: 10px;border-bottom:1px solid #ccc;padding: 10px"><strong style="margin-right: 5px; color: #0d142d;">Full Name:</strong> ${data.full_name}</li>
                    <li style="margin-bottom: 10px;border-bottom:1px solid #ccc;padding: 10px"><strong style="margin-right: 5px; color: #0d142d;">Email Address:</strong> ${data.email}</li>
                    <li style="margin-bottom: 10px;border-bottom:1px solid #ccc;padding: 10px"><strong style="margin-right: 5px; color: #0d142d;">Comments:</strong> ${data.note_inq}</li>
                </ul>
            </body>
            `;

            const payload = {
                message: Message,
                subject: `Contact message from: ${data.full_name}`,
                recaptcha_token: captchaToken,
            };

            const response = await customFetch.post("/forms/message", payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log(response.data);
            setIsFormSubmitted(true);
        } catch (error) {
            console.error("Error sending form data:", error);
        }
    };

    return (
        <>
            <div className="inquiry">
                <div className="container">
                    {!isFormSubmitted ? (
                        <form
                            className="form-mud"
                            onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    id="full_name"
                                    name="full_name"
                                    {...register("full_name", {
                                        required: true,
                                    })}
                                    placeholder={form_info.full_name}
                                    className="form-control"
                                />
                                <label htmlFor="full_name">
                                    {form_info.full_name}
                                </label>
                                {errors.full_name && (
                                    <div className="text-danger">
                                        {errors.full_name.message}
                                    </div>
                                )}
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    {...register("email")}
                                    placeholder={form_info.email}
                                    className="form-control"
                                />
                                <label htmlFor="email">{form_info.email}</label>
                            </div>

                            <div className="form-floating">
                                <textarea
                                    className="form-control"
                                    placeholder="Leave a comment here"
                                    {...register("note_inq")}
                                    id="note"></textarea>
                                <label htmlFor="note">
                                    <i className="far fa-comment px-1"></i>
                                    {form_info.comments}
                                </label>
                            </div>
                            <div className="mt-3">
                                {/* <ReCAPTCHA
                                    sitekey={
                                        process.env
                                            .NEXT_PUBLIC_RECAPTCHA_SITE_KEY
                                    }
                                    onChange={onCaptchaChange}
                                /> */}
                            </div>
                            <div className="mt-3 d-grid">
                                <button
                                    type="submit"
                                    className="btn-io-bg"
                                    // disabled={isSubmitting}
                                    disabled={isSubmitting || !captchaToken}>
                                    {isSubmitting
                                        ? "Loading..."
                                        : `${form_info.send}`}
                                </button>
                            </div>
                            {/* <div className="form-check">
                                <input
                                    className="form-check-input"
                                    name="accepted"
                                    type="checkbox"
                                    id="accepted"
                                    {...register("accepted", {
                                        required: true,
                                    })}
                                    value=""
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="accepted">
                                    {form_info.check_box}
                                </label>
                            </div> */}
                            {/* Your captcha code */}
                            {/* <div className="form-check my-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    {...register("captcha")}
                                    id="flexCheckDefault"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefault">
                                    {form_info.check_box}
                                </label>
                            </div> */}
                        </form>
                    ) : (
                        <div className="success-message">
                            <div className="msg-success">
                                <div className="cover-msg">
                                    <div className="img-icon">
                                        <i className="far fa-check-circle"></i>
                                    </div>
                                    <div className="info-msg">
                                        <h2>Thank you </h2>
                                        <h4>Message has been received</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ContactForm;
