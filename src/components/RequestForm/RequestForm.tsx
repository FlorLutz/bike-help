"use client";
import React from "react";

export default function RequestForm() {
  function handleSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log("formdata", data);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label htmlFor="problem">What part is broken/not working:*</label>
      <input
        type="text"
        name="problem"
        id="problem"
        required
        maxLength={30}
        placeholder="e.g. flat tire"
      ></input>
      <label htmlFor="description">additional description (optional):</label>
      <input
        type="text"
        name="description"
        id="description"
        maxLength={50}
        placeholder='e.g. got a 28" bike, front tire is down, probably a little hole in the tube'
      ></input>
      <label htmlFor="tools">tools needed (optional):</label>
      <input
        type="text"
        name="tools"
        id="tools"
        maxLength={30}
        placeholder='e.g. tire levers, patch and glue or a new 28" race tube'
      ></input>
      <button type="submit">Request help</button>
    </form>
  );
}
