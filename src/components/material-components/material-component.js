import { Button, TextField } from "@mui/material";

export function MaterialComponents() {
        return (
        <div className="container-fluid">
            <h2>Bootstrap Components</h2>
            <button className="btn btn-primary">Bootstrap Button</button>
            <h2>Material Components</h2>
            <TextField label="Your Email" variant="standard" />
            <br /> <br />
            <Button variant="contained" color="success">Register</Button>
        </div>
        );
}