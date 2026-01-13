import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaSave,
  FaTimes,
  FaHeart,
  FaUserAstronaut,
  FaCode,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

export default function EditProfile({ userData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({
    firstName: userData.firstName || "",
    lastName: userData.lastName || "",
    gender: userData.gender || "Male",
    age: userData.age || "",
    photoUrl: userData.photoUrl || "",
    about: userData.about || "",
    skills: userData.skills || [],
  });

  // useEffect(() => {
  //   if (userData) {
  //     setProfile({
  //       firstName: userData.firstName || "",
  //       lastName: userData.lastName || "",
  //       gender: userData.gender || "Male",
  //       age: userData.age || "",
  //       photoUrl: userData.photoUrl || "",
  //       about: userData.about || "",
  //       skills: userData.skills || [],
  //     });
  //   }
  // }, [userData]);

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim())
          return `${name === "firstName" ? "First" : "Last"} name is required`;
        if (value.length < 2) return "Must be at least 2 characters";
        if (value.length > 50) return "Must be less than 50 characters";
        if (!/^[a-zA-Z\s'-]+$/.test(value))
          return "Only letters, spaces, hyphens and apostrophes allowed";
        return "";

      case "age":
        const age = parseInt(value);
        if (isNaN(age) || age < 18 || age > 100)
          return "Age must be between 18 and 100";
        return "";

      case "photoUrl":
        try {
          new URL(value);
        } catch {
          return "Please enter a valid URL";
        }
        return "";

      case "about":
        if (value.length > 500) return "Must be less than 500 characters";
        return "";

      case "skills":
        if (value.length > 10) return "Maximum 10 skills allowed";
        if (value.some((skill) => skill.length > 30))
          return "Each skill must be less than 30 characters";
        return "";

      default:
        return "";
    }
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(profile).forEach((key) => {
      if (key !== "gender") {
        const error = validateField(key, profile[key]);
        if (error) newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });

    // Real-time validation
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    setProfile({ ...profile, skills: skillsArray });
    const error = validateField("skills", skillsArray);
    setErrors((prev) => ({ ...prev, skills: error }));
  };

  const handleSave = async () => {
    if (!validateAll()) {
      return;
    }

    setIsSaving(true);
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", profile, {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addUser(res.data.data));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error(
        "Profile update failed:",
        error.response?.data || error.message
      );
      setErrors({ general: "Failed to save profile. Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setProfile({
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      gender: userData.gender || "Male",
      age: userData.age || "",
      photoUrl: userData.photoUrl || "",
      about: userData.about || "",
      skills: userData.skills || [],
    });
    setErrors({});
    setIsEditing(false);
  };

  const InputField = ({ label, name, type = "text", icon }) => (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-gray-300 font-medium flex items-center gap-2">
          {icon}
          {label}
        </span>
      </label>
      <input
        disabled={!isEditing}
        type={type}
        name={name}
        value={profile[name]}
        onChange={handleChange}
        className={`
          input w-full rounded-xl
          bg-[#0a0e1a]/80 backdrop-blur-md
          text-white placeholder-gray-500
          border ${errors[name] ? "border-red-500/50" : "border-white/10"}
          shadow-lg shadow-black/20
          focus:outline-none
          focus:border-cyan-500/50
          focus:ring-2 focus:ring-cyan-500/20
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-300
          hover:border-white/20
        `}
      />
      {errors[name] && (
        <label className="label">
          <span className="label-text-alt text-red-400 flex items-center gap-1">
            <FaExclamationCircle className="text-xs" />
            {errors[name]}
          </span>
        </label>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#020617] to-[#0a0e1a] p-4 sm:p-6 lg:p-8">
      {/* Success Toast */}
      {showSuccess && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success bg-green-500/20 border border-green-400/40 text-green-300 shadow-lg">
            <FaCheckCircle />
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {/* <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 flex items-center justify-center gap-3">
                <FaCode className="text-cyan-400" />
                devTinder
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
                Find your perfect dev match 💙
            </p>
            </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* ================= CARD PREVIEW ================= */}
          <div className="flex justify-center order-2 lg:order-1">
            <div className="w-full max-w-sm">
              <div className="text-center mb-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-white flex items-center justify-center gap-2">
                  <FaHeart className="text-pink-500" />
                  Live Preview
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  See how others will see you
                </p>
              </div>

              <div
                className="
                  relative bg-[#0a0e1a] shadow-2xl rounded-3xl overflow-hidden 
                  w-full h-[450px] sm:h-[450px]
                  transition-all duration-500 
                  hover:scale-[1.02] hover:shadow-cyan-500/20
                  border border-white/10
                "
              >
                {/* Image */}
                <figure className="relative h-[55%] bg-black/30 overflow-hidden">
                  <img
                    src={
                      profile.photoUrl ||
                      "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
                    }
                    alt={profile.firstName}
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x600?text=Invalid+URL";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 drop-shadow-lg">
                      {profile.firstName} {profile.lastName}
                      {profile.age && (
                        <span className="text-base sm:text-lg text-gray-300">
                          , {profile.age}
                        </span>
                      )}
                    </h2>
                    <p className="text-sm text-gray-300 flex items-center gap-2 mt-1">
                      <FaUserAstronaut className="text-cyan-400" />{" "}
                      {profile.gender}
                    </p>
                  </div>
                </figure>

                {/* Body */}
                <div className="flex flex-col justify-between h-[45%] p-4 sm:p-5">
                  <div>
                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-3">
                      {profile.about || "Tell others about yourself..."}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {profile?.skills?.slice(0, 6).map((skill, i) => (
                        <span
                          key={i}
                          className="badge bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/40 px-3 py-3 text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {profile?.skills?.length > 6 && (
                        <span className="badge bg-white/10 text-gray-400 border border-white/20">
                          +{profile.skills.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button className="flex-1 btn btn-error text-base sm:text-lg rounded-xl shadow-lg hover:scale-105 transition-transform border-none">
                      <FaTimes /> Pass
                    </button>
                    <button className="flex-1 btn btn-success text-base sm:text-lg rounded-xl shadow-lg hover:scale-105 transition-transform border-none">
                      <FaHeart /> Match
                    </button>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-3xl pointer-events-none ring-1 ring-cyan-500/20"></div>
              </div>
            </div>
          </div>

          {/* ================= FORM EDITOR ================= */}
          <div className="flex justify-center order-1 lg:order-2">
            <div className="w-full max-w-xl">
              <div
                className="
                  w-full min-h-[600px] sm:h-[650px]
                  rounded-3xl shadow-2xl overflow-hidden
                  bg-gradient-to-br from-[#0a0e1a] via-[#010314] to-black
                  border border-white/10
                "
              >
                {/* Header */}
                <div className="relative p-4 sm:p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-white/10">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    disabled={isSaving}
                    className={`
                      absolute top-4 right-4 btn btn-circle btn-sm
                      ${
                        isEditing
                          ? "bg-cyan-500/20 border-cyan-400/40"
                          : "bg-white/10 border-white/20"
                      }
                      backdrop-blur-md text-white
                      hover:bg-cyan-500/30
                      disabled:opacity-50
                      transition-all duration-300
                    `}
                  >
                    <FaEdit className={isEditing ? "text-cyan-300" : ""} />
                  </button>
                  <h2 className="text-xl sm:text-2xl text-white font-semibold pr-12">
                    {isEditing ? "✏️ Editing Profile" : "👤 Your Profile"}
                  </h2>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">
                    {isEditing
                      ? "Make changes and save"
                      : "Click edit to update"}
                  </p>
                </div>

                {/* Form */}
                <div className="p-4 sm:p-6 space-y-4 bg-black/30 backdrop-blur-xl overflow-y-auto h-[calc(600px-88px)] sm:h-[calc(650px-100px)]">
                  {errors.general && (
                    <div className="alert alert-error bg-red-500/20 border border-red-400/40 text-red-300">
                      <FaExclamationCircle />
                      <span>{errors.general}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="First Name" name="firstName" />
                    <InputField label="Last Name" name="lastName" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Age" name="age" type="number" />

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-gray-300 font-medium">
                          Gender
                        </span>
                      </label>
                      <select
                        disabled={!isEditing}
                        name="gender"
                        value={profile.gender}
                        onChange={handleChange}
                        className="
                          select w-full rounded-xl
                          bg-[#0a0e1a]/80
                          text-white
                          border border-white/10
                          focus:border-cyan-500/50
                          focus:ring-2 focus:ring-cyan-500/20
                          disabled:opacity-50
                          transition-all duration-300
                        "
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <InputField label="Photo URL" name="photoUrl" type="url" />

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-300 font-medium">
                        About You
                      </span>
                      <span className="label-text-alt text-gray-500">
                        {profile.about?.length || 0}/500
                      </span>
                    </label>
                    <textarea
                      disabled={!isEditing}
                      name="about"
                      value={profile.about}
                      onChange={handleChange}
                      rows={4}
                      className={`
                        textarea w-full rounded-xl
                        bg-[#0a0e1a]/80
                        text-white placeholder-gray-500
                        border ${
                          errors.about ? "border-red-500/50" : "border-white/10"
                        }
                        focus:border-cyan-500/50
                        focus:ring-2 focus:ring-cyan-500/20
                        disabled:opacity-50
                        transition-all duration-300
                        resize-none
                      `}
                      placeholder="Tell others about yourself, your interests, and what you're looking for..."
                    />
                    {errors.about && (
                      <label className="label">
                        <span className="label-text-alt text-red-400 flex items-center gap-1">
                          <FaExclamationCircle className="text-xs" />
                          {errors.about}
                        </span>
                      </label>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-300 font-medium flex items-center gap-2">
                        <FaCode className="text-cyan-400" />
                        Skills (comma separated)
                      </span>
                      <span className="label-text-alt text-gray-500">
                        {profile.skills?.length || 0}/10
                      </span>
                    </label>
                    <input
                      disabled={!isEditing}
                      value={profile?.skills?.join(", ") || ""}
                      onChange={handleSkillsChange}
                      placeholder="React, Node.js, Python, AWS..."
                      className={`
                        input w-full rounded-xl
                        bg-[#0a0e1a]/80
                        text-white placeholder-gray-500
                        border ${
                          errors.skills
                            ? "border-red-500/50"
                            : "border-white/10"
                        }
                        focus:border-cyan-500/50
                        focus:ring-2 focus:ring-cyan-500/20
                        disabled:opacity-50
                        transition-all duration-300
                      `}
                    />
                    {errors.skills && (
                      <label className="label">
                        <span className="label-text-alt text-red-400 flex items-center gap-1">
                          <FaExclamationCircle className="text-xs" />
                          {errors.skills}
                        </span>
                      </label>
                    )}
                  </div>

                  {/* Buttons */}
                  {isEditing && (
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <button
                        onClick={handleCancel}
                        disabled={isSaving}
                        className="flex-1 btn bg-red-500/20 border border-red-400/40 text-red-300 hover:bg-red-500/30 disabled:opacity-50 rounded-xl"
                      >
                        <FaTimes /> Cancel
                      </button>
                      <button
                        onClick={() => {
                          handleSave();
                          if (Object.keys(errors).length === 0) {
                            setIsEditing(false);
                          }
                        }}
                        disabled={isSaving}
                        className="flex-1 btn bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 text-cyan-300 hover:from-cyan-500/30 hover:to-blue-500/30 disabled:opacity-50 rounded-xl"
                      >
                        {isSaving ? (
                          <>
                            <span className="loading loading-spinner loading-sm"></span>
                            Saving...
                          </>
                        ) : (
                          <>
                            <FaSave /> Save Profile
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
