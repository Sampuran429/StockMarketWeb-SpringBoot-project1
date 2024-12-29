import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { login } from "@/State/Auth/Action";
import { useNavigate } from "react-router-dom";

const SigninForm = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const form = useForm({
        resolver: "", // Add resolver if needed, like zodResolver
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data) => {
        dispatch(login({data,navigate}))
        console.log(data);
    };

    return (
        <div>
            <h1 className="text-xl font-bold text-center pb-3">Sign In</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                               
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="abc@gmail.com"
                                        {...field}
                                        className="border w-full border-gray-700 p-5"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                               
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Your Password"
                                        {...field}
                                        className="border w-full border-gray-700 p-5"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full py-5">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default SigninForm;
