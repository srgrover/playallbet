import { IoLogoGithub, IoLogoGoogle } from 'react-icons/io5'
import { BiLinkAlt } from 'react-icons/bi'
import { ButtonProvider } from './ButtonProvider'

const providers = [
    {
        provider: 'google',
        icon: <IoLogoGoogle size={20} />
    },
    {
        provider: 'github',
        icon: <IoLogoGithub size={20} />
    }
]

export const LoginForm = () => {
    return (
        <form className='flex flex-col gap-5 items-center justify-center p-8 border border-gray-200 rounded-lg'>
            <div className='flex flex-col items-center gap-2'>
                <BiLinkAlt size={55} className='p-3 bg-gray-800 text-white rounded-md' />
                <h2 className='text-3xl font-raleway-bold text-gray-800'>PlayAllBet Login</h2>
                <p className='text-gray-500'>Log in with your favorite social provider to get started:</p>
            </div>
            <div className='flex flex-col w-full gap-2'>
                {
                    providers.map((provider) => (
                        <ButtonProvider key={provider.provider} { ...provider } />
                    ))
                }
            </div>
        </form>
    )
}