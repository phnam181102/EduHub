import { Box, Modal } from '@mui/material';
import React, { FC } from 'react';

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: any;
    component: any;
    setRoute?: (route: string) => void;
};

const CustomModal: FC<Props> = ({
    open,
    setOpen,
    component: Component,
    setRoute,
}) => {
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white  shadow py-5 px-10 outline-none">
                <Component setOpen={setOpen} setRoute={setRoute} />
            </Box>
        </Modal>
    );
};

export default CustomModal;
