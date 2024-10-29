import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Layout from '@/Layouts/Layout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <Layout>
            <Head title="Log in"/>

            <div className="h-[93vh] w-full flex flex-col sm:justify-center items-center" style={{ backgroundImage: 'url(/orange-background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-gradient-to-b from-red-200 to-yellow-200  border-orange-300 border-2 shadow-md overflow-hidden sm:rounded-lg">

                    {status && (
                        <div className="mb-4 text-sm font-medium">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="email" value="Email"/>

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />

                            <InputError message={errors.email} className="mt-2"/>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password"/>

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />

                            <InputError message={errors.password} className="mt-2"/>
                        </div>

                        <div className="mt-4 block">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData('remember', e.target.checked)
                                    }
                                />
                                <span className="ms-2 text-sm text-black">
                            Remember me
                        </span>
                            </label>
                        </div>

                        <div className="mt-4 flex items-center justify-end">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="rounded-md text-sm text-red-400 underline hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Forgot your password?
                                </Link>
                            )}

                            <PrimaryButton className="bg-red-500 hover:bg-orange-500 text-yellow-200 font-bold py-2 px-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50" disabled={processing}>
                                Log in
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
