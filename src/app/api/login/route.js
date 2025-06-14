import dbConnect from '../../lib/dbConnect'; // Adjust the path as needed
import User from '../../models/Users'; // Adjust path if different
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    console.log("Login request received");
    console.log("Email:", email);

    await dbConnect();
    console.log("Database connected");

    const user = await User.findOne({ email });

    if (!user) {
      console.log("No user found with this email");
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), {
        status: 401,
      });
    }

    if (user.password !== password) {
      console.log("Passwords do not match");
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), {
        status: 401,
      });
    }

    if (!user.isActive) {
      return new Response(JSON.stringify({ message: 'Account is inactive' }), {
        status: 403,
      });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return new Response(
      JSON.stringify({
        token,
        user: {
          _id: user._id,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Login API Error:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
    });
  }
}
