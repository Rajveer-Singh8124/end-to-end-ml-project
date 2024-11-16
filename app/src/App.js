import './App.css';
import axios from "axios";
import { useState } from "react";

function App() {
    const [response, setResponse] = useState(null);

    const [formData, setFormData] = useState({
        gender: "male", 
        race_ethnicity: "group A", 
        parental_level_of_education: "bachelor's degree", 
        lunch: "standard", 
        test_preparation_course: "none", 
        reading_score: "",
        writing_score: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted with data: ", formData);

        try {
            const res = await axios.post("http://localhost:5000/api/predict", formData);
            setResponse(res.data);  
            console.log("Response from backend:", res.data);
        } catch (error) {
            console.error("Error submitting the form:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(value);

        setFormData({
            ...formData,
            [name]: value 
        });
    };

    return (
        <div className="form-container">
            <h2>Student Data Input Form</h2>
            <form onSubmit={handleSubmit}>
                {/* Gender */}
                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                {/* Race/Ethnicity */}
                <div className="form-group">
                    <label htmlFor="race_ethnicity">Race/Ethnicity</label>
                    <select
                        id="race_ethnicity"
                        name="race_ethnicity"
                        value={formData.race_ethnicity}
                        onChange={handleChange}
                        required
                    >
                        <option value="group A">Group A</option>
                        <option value="group B">Group B</option>
                        <option value="group C">Group C</option>
                        <option value="group D">Group D</option>
                        <option value="group E">Group E</option>
                    </select>
                </div>

                {/* Parental Level of Education */}
                <div className="form-group">
                    <label htmlFor="parental_level_of_education">Parental Level of Education</label>
                    <select
                        id="parental_level_of_education"
                        name="parental_level_of_education"
                        value={formData.parental_level_of_education}
                        onChange={handleChange}
                        required
                    >
                        <option value="bachelor's degree">Bachelor's Degree</option>
                        <option value="some college">Some College</option>
                        <option value="master's degree">Master's Degree</option>
                        <option value="associate's degree">Associate's Degree</option>
                        <option value="high school">High School</option>
                        <option value="some high school">Some High School</option>
                    </select>
                </div>

                {/* Lunch */}
                <div className="form-group">
                    <label htmlFor="lunch">Lunch</label>
                    <select
                        id="lunch"
                        name="lunch"
                        value={formData.lunch}
                        onChange={handleChange}
                        required
                    >
                        <option value="standard">Standard</option>
                        <option value="free/reduced">Free/Reduced</option>
                    </select>
                </div>

                {/* Test Preparation Course */}
                <div className="form-group">
                    <label htmlFor="test_preparation_course">Test Preparation Course</label>
                    <select
                        id="test_preparation_course"
                        name="test_preparation_course"
                        value={formData.test_preparation_course}
                        onChange={handleChange}
                        required
                    >
                        <option value="none">None</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                {/* Reading Score */}
                <div className="form-group">
                    <label htmlFor="reading_score">Reading Score</label>
                    <input
                        type="number"
                        id="reading_score"
                        name="reading_score"
                        value={formData.reading_score}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        required
                    />
                </div>

                {/* Writing Score */}
                <div className="form-group">
                    <label htmlFor="writing_score">Writing Score</label>
                    <input
                        type="number"
                        id="writing_score"
                        name="writing_score"
                        value={formData.writing_score}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>
            </form>

            {response && (
                <div className="response-container">
                    <h3>Predicted Math Score</h3>
                    <pre><b><h4 style={{color:"green"}}>{JSON.stringify(response, null, 2)}</h4></b></pre>
                </div>
            )}
        </div>
    );
}

export default App;
