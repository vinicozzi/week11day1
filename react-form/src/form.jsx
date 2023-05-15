import "./form.css";
import {useState} from 'react';

function Form(props) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneType, setPhoneType] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [staff, setStaff] = useState("");
    const [bio, setBio] = useState("");
    const [notifications, setNotifications] = useState("");

    const [errorMessages, setErrorMessages] = useState([]);

    function handlePhoneTypeChange(event) {
        setPhoneType(event.target.value);

      }
    
      function handlePhoneNumberChange(event) {
        setPhoneNumber(event.target.value);
      }

    function isValidEmail(email) {

        const emailSplit = email.split('@') 

        if (!email) {return false;}
        
        if (emailSplit.length !== 2) {
                return false;
        } 

        const emailPeriodSplit = emailSplit[emailSplit.length-1].split('.');

        if (emailPeriodSplit.length !== 2) {
            return false;
        }
            return true; 

    }

    const handleChange = field => {
        return (e) => {
          switch (field) {
            case "name":
              setName(e.target.value);
              break;
            case "email":
              setEmail(e.target.value);
              break;
            case "phoneType":
              setPhoneType(e.target.value);
              break;
            case "phoneNumber":
                setPhoneNumber(e.target.value);
                break;
            case "staff":
                setStaff(e.target.value);
                break;
            case "bio": 
                setBio(e.target.value);
                break;
            case "notifications": 
                setNotifications(e.target.value);
                break;
            default:
              break;
          }
        }
      }
    
      const handleSignUp = (e)=> {
            e.preventDefault();

            let errors = validate();
        
            if (errors.length > 0) {
            setErrorMessages(errors);
            } else {
            let user = {
                name,
                email,
                phoneType,
                phoneNumber,
                staff,
                notifications,
                bio, 
            };
            console.log(user)
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleString();
            console.log(formattedDate); 
            }
      }

      const showErrors = ()=> {
      if (!errorMessages.length) {
        return null;
      } else {
        return (
          <ul>
            {errorMessages.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        )
      }
    }
    const validate = () => {
        let errors = [];
    
        if (name.length === 0 ) {
          errors.push("First Name cannot be blank.");
        }
        if (email.length === 0) {
          errors.push("Email cannot be blank.");
        }
        if (!isValidEmail(email)){
            errors.push("This email is invalid.");
        }
        if (!phoneNumber.null && phoneType !== '' && phoneNumber.length != 10){
            errors.push("Phone number must be 10 digits");
        }
        if (bio.length > 280) {
            errors.push("Bio cannot be more than 280 characters!");
        }
        return errors;
      }

    return (
        <>
        {showErrors()}
            <form className='form' onSubmit={handleSignUp}>
                <input type="text" placeholder='Name' value={name} onChange={handleChange('name')} />
                <br />

                <input type="text" placeholder='Email' value={email} onChange={handleChange('email')} />
                <br />

                <label for="my-dropdown">Select a phone type</label>
                <select id="my-dropdown" name="phone-type" value={phoneType} onChange={handlePhoneTypeChange}>
                        <option value="">Please select</option>
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="cell">Cell</option>
                </select>
                <br />
                
                <input type="text" name="phone-number" placeholder='Number' value={phoneNumber} onChange={handlePhoneNumberChange} disabled={phoneType === ''}/>
                <br />
                <label>
                <input type="radio" value="Instructor" checked={staff === 'Instructor'} onChange={handleChange('staff')} />
                    Instructor 
                </label>
                <label>
                <input type="radio" value="Student" checked={staff === 'Student'} onChange={handleChange('staff')}></input>
                    Student 
                </label>
                <p>Selected position: {staff}</p>
                <br />

                <input type="text" placeholder="Bio" value={bio} onChange={handleChange('bio')} />
                <br />
                <input type="checkbox" check={notifications} value={notifications ? 'no' : 'yes'} onChange={handleChange('notifications')}/>
                    Sign Up For Notifications!
                <br />
                <button>Sign Up</button>
            </form>

        </>
    )
}

export default Form;