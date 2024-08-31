import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

import Button from '@mui/material/Button';

export default function Notify({ open, onclose, response }) {

    // function SlideTransition(props) {
    //     return <Slide {...props} direction="left" />;
    // }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        onclose(false);
    };

    // console.log(response);

    return (
        <div>
            <Snackbar open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                // TransitionComponent={SlideTransition}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            // key={SlideTransition}

            >
                <Alert
                    onClose={handleClose}
                    severity={response.severity}
                    variant="filled"
                    sx={{
                        width: '100%',
                        // border: "1px solid black",
                        borderRadius: "30px",
                        // color: "black",
                        // bgcolor: "lightgreen",
                        fontWeight: "bold",
                    }}
                >
                    {response.message}
                </Alert>
            </Snackbar>
        </div>
    );
}