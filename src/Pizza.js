import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';

//form schema
const formSchema = yup.object().shape({
	name: yup.string().required('Name is a required field.'),
	size: yup.string().required('Must Select a Size'),
	pepperoni: yup.boolean().defined(),
	pineapple: yup.boolean().defined(),
	peppers: yup.boolean().defined(),
	sausage: yup.boolean().defined(),
	specInstr: yup.string().notRequired()
});

export default function Form() {
	//state for form
	const [ formState, setFormState ] = useState({
		name: '',
		size: '',
		pepperoni: false,
		pineapple: false,
		peppers: false,
		sausage: false,
		specInstr: ''
	});
	//state for errors
	const [ errors, setErrors ] = useState({
		name: '',
		size: '',
		pepperoni: '',
		pineapple: '',
		peppers: '',
		sausage: '',
		specInstr: ''
	});
	//state for button
	const [ buttonDisabled, setButtonDisabled ] = useState(true);
	//state for post
	const [ post, setPost ] = useState();

	//input change -- Event handlers
	const inputChange = (e) => {
		e.persist();
		const newFormData = {
			...formState,
			[e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
		};

		validateChange(e);
		setFormState(newFormData);
	};
	//button disabled
	useEffect(
		() => {
			formSchema.isValid(formState).then((valid) => {
				setButtonDisabled(!valid);
			});
		},
		[ formState ]
	);
	//validate changes
	const validateChange = (e) => {
		yup
			.reach(formSchema, e.target.name)
			.validate(e.target.value)
			.then((valid) => {
				setErrors({
					...errors,
					[e.target.name]: ''
				});
			})
			.catch((err) => {
				setErrors({
					...errors,
					[e.target.name]: err.errors[0]
				});
			});
	};
	//on submit
	const formSubmit = (e) => {
		e.preventDefault();
		axios
			.post('https://reqres.in/api/users', formState)
			.then((res) => {
				setPost(res.data);
				console.log('success', post);
				console.log(res.data.size);
				setFormState({
					name: '',
					size: res.data.size,
					pepperoni: false,
					pineapple: false,
					peppers: false,
					sausage: false,
					specInstr: ''
				});
			})
			.catch((err) => console.log(err.response));
	};
	// return the form
	return (
		<form onSubmit={formSubmit}>
			<h1>Place Order</h1>
			<label htmlFor="name">
				Name
				<br />
				<input
					type="text"
					name="name"
					id="nameinput"
					placeholder="Name"
					value={formState.name}
					onChange={inputChange}
				/>
			</label>
			<br />

			<label htmlFor="size">
				Choose a size
				<br />
				<select name="size" id="sizeinput" onChange={inputChange}>
					<option name="default" value={null} />
					<option name="Sm" value="Sm">
						Sm
					</option>
					<option name="Lg" value="Lg">
						Lg
					</option>
					<option name="XL" value="XL">
						XL
					</option>
				</select>
			</label>
			<br />

			<div className="toppingsChecklist">
				<p>Select your toppings</p>

				<label htmlFor="pepperoni">
					<input
						type="checkbox"
						name="pepperoni"
						id="pepperoniCheckBox"
						checked={formState.pepperoni}
						onChange={inputChange}
					/>
					Pepperoni
				</label>
				<br />

				<label htmlFor="pineapple">
					<input
						type="checkbox"
						name="pineapple"
						id="pineappleCheckBox"
						checked={formState.pineapple}
						onChange={inputChange}
					/>
					Pineapple{' '}
				</label>
				<br />

				<label htmlFor="peppers">
					<input
						type="checkbox"
						name="peppers"
						id="peppersCheckBox"
						checked={formState.peppers}
						onChange={inputChange}
					/>
					Peppers
				</label>
				<br />

				<label htmlFor="sausage">
					<input
						type="checkbox"
						name="sausage"
						id="sausageCheckBox"
						checked={formState.sausage}
						onChange={inputChange}
					/>
					Sausage
				</label>
				<br />
			</div>

			<label htmlFor="Special Instructions">
				Any special instructions?
				<br />
				<textarea
					name="specInstr"
					id="specInstrInput"
					placeholder="Anything else?"
					value={formState.specInstr}
					onChange={inputChange}
				/>
			</label>
			<br />
			<button name="submit" disabled={buttonDisabled}>
				Submit
			</button>
		</form>
	);
}
