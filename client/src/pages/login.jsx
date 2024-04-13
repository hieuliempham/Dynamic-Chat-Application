import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";

//prettier
const Login = () => {
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
                <h2>Đăng nhập</h2>

                <Form.Control type="email;" placeholder="Email"/>
                <Form.Control type="password" placeholder="Mật khẩu"/>
                <Button varriant="primary" type="submit">
                    Đăng nhập
                </Button>
                <Alert variant="danger">Xảy ra Lỗi :((</Alert>
            </Stack>
            </Col>
        </Row>
    </Form>
    </> );
}
 
export default Login;