import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";

//prettier
const Register = () => {
    return ( 
    <>
    <Form>
        <Row 
         style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "10%"
         }}
        >
            <Col xs={6}>
            <Stack gap={3}>
                <h2>Đăng ký</h2>

                <Form.Control type="text" placeholder="Tên"/>
                <Form.Control type="email;" placeholder="Email"/>
                <Form.Control type="password" placeholder="Mật khẩu"/>
                <Button varriant="primary" type="submit">
                    Đăng ký
                </Button>
                <Alert variant="danger">Xảy ra Lỗi :((</Alert>
            </Stack>
            </Col>
        </Row>
    </Form>
    </> );
}
 
export default Register;