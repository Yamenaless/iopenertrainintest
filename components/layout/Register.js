"use client";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";

import customFetch from "@/lib/axios";
const schema = z.object({
    title: z.string(),
    full_name: z
        .string()
        .min(3, { message: "Must be 3 or more characters long" }),
    job: z.string().min(3, { message: "Must be 3 or more characters long" }),
    phone: z
        .string()
        .min(8, { message: "Must be 10 or more Number long" })
        .max(18, { message: "Must be 18 or less characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    company: z.string(),
    city: z.string(),
});

const Register = ({ lang, form_info, eventInfo }) => {
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
                <h2 style="color: #0d142d; font-size: 20px;padding:10px">Register: ${eventInfo.course.name.en}</h2>
                <h2 style="color: #0d142d; font-size: 20px;padding:10px">In ${eventInfo.city.name.en} on ${eventInfo.start_date}</h2>
                <ul style="list-style-type: none; padding: 10px;">
                    <li style="margin-bottom: 10px;border-bottom:1px solid #ccc;padding: 10px"><strong style="margin-right: 5px; color: #0d142d;">Full Name:</strong> ${data.title} ${data.full_name}</li>
                    <li style="margin-bottom: 10px;border-bottom:1px solid #ccc;padding: 10px"><strong style="margin-right: 5px; color: #0d142d;">Job:</strong> ${data.job}</li>
                    <li style="margin-bottom: 10px;border-bottom:1px solid #ccc;padding: 10px"><strong style="margin-right: 5px; color: #0d142d;">Phone Number:</strong> ${data.phone}</li>
                    <li style="margin-bottom: 10px;border-bottom:1px solid #ccc;padding: 10px"><strong style="margin-right: 5px; color: #0d142d;">Email:</strong> ${data.email}</li>
                    <li style="margin-bottom: 10px;border-bottom:1px solid #ccc;padding: 10px"><strong style="margin-right: 5px; color: #0d142d;">Company:</strong> ${data.company}</li>
                    <li style="margin-bottom: 10px;border-bottom:1px solid #ccc;padding: 10px"><strong style="margin-right: 5px; color: #0d142d;">City:</strong> ${data.city}</li>
                </ul>
            </body>
            `;

            const payload = {
                message: Message,
                subject: `Register message from: ${data.full_name} `,
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
            <div className="register">
                <div className="container">
                    {!isFormSubmitted ? (
                        <form
                            className="form-mud"
                            onSubmit={handleSubmit(onSubmit)}>
                            <h5 className="title-sec">Delegate Information</h5>
                            <div className="row g-2">
                                <div className="col-sm-12 col-md-2">
                                    <div className="form-floating mb-3">
                                        <select
                                            className="form-select"
                                            id="title"
                                            name="title"
                                            aria-label="title"
                                            {...register("title", {
                                                required: true,
                                            })}>
                                            <option selected>
                                                {" "}
                                                {form_info.select_title}{" "}
                                            </option>

                                            <option value="Mr">
                                                {form_info.mr}
                                            </option>
                                            <option value="Ms">
                                                {" "}
                                                {form_info.ms}{" "}
                                            </option>
                                        </select>
                                        <label htmlFor="title">
                                            {" "}
                                            {form_info.title}{" "}
                                        </label>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
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
                                        <label htmlFor="first_name">
                                            {form_info.full_name}
                                        </label>
                                        {errors.full_name && (
                                            <div className="text-danger">
                                                {errors.full_name.message}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            id="job"
                                            name="job"
                                            {...register("job", {
                                                required: true,
                                            })}
                                            placeholder={form_info.job}
                                            className="form-control"
                                        />
                                        <label htmlFor="job">
                                            {form_info.job}
                                        </label>
                                        {errors.job && (
                                            <div className="text-danger">
                                                {errors.job.message}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            id="phone"
                                            name="phone"
                                            {...register("phone", {
                                                required: true,
                                            })}
                                            placeholder={form_info.phone}
                                            className="form-control"
                                        />
                                        <label htmlFor="phone">
                                            {form_info.phone}
                                        </label>
                                        {errors.phone && (
                                            <div className="text-danger">
                                                {errors.phone.message}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-floating mb-3">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            {...register("email", {
                                                required: true,
                                            })}
                                            placeholder={form_info.email}
                                            className="form-control"
                                        />
                                        <label htmlFor="email">
                                            {form_info.email}
                                        </label>
                                        {errors.email && (
                                            <div className="text-danger">
                                                {errors.email.message}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <h5 className="title-sec mt-3">
                                Company Information
                            </h5>
                            <div className="row g-2">
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            {...register("company", {
                                                required: true,
                                            })}
                                            placeholder={form_info.company}
                                            className="form-control"
                                        />
                                        <label htmlFor="company">
                                            {form_info.company}
                                        </label>
                                        {errors.company && (
                                            <div className="text-danger">
                                                {errors.company.message}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-6">
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            {...register("city", {
                                                required: true,
                                            })}
                                            placeholder={form_info.city}
                                            className="form-control"
                                        />
                                        <label htmlFor="city">
                                            {form_info.city}
                                        </label>
                                        {errors.city && (
                                            <div className="text-danger">
                                                {errors.city.message}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="form-floating mt-3 overflow-hidden mb-3"></div>

                            {/* <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                    checked
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefault">
                                    I agree to receive course informations and offers from
                                    this website.
                                </label>
                            </div> */}
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
                                    title="iopener Training Center Register"
                                    className="btn-io-bg">
                                    {form_info.send}
                                </button>
                            </div>
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
                                        <h4>Register has been received</h4>
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

export default Register;
