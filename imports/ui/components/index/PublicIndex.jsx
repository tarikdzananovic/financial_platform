import React from 'react';
import { Jumbotron } from 'react-bootstrap';


const PublicIndex = () => (
    <div className="Index">
        <Jumbotron className="text-center">
            <h2>Base</h2>
            <p>A starting point for EZ_B application</p>
            <p><a className="btn btn-success" href="https://github.com/tarikdzananovic/financial_platform" role="button">Visit Github</a></p>
        </Jumbotron>
    </div>
);

export default PublicIndex;