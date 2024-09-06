"use client"

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
// import { signIn } from '@/lib/auth';
import { api, apiSecure } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AppStorage } from '@/lib/app.storage';
import {Requestdetails} from '@/lib/models'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

async function onSignIn() {
  // let data:Requestdetails = {
  //   email:
  // }
  // api.post()
}

export default function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    const res = await api.post('/users/login', {
      username:email,
      password:password
    });

    AppStorage.setBearerToken(res.data.access_token)
    AppStorage.setUserData({
      email: email,
      id: res.data.user_id
    })
    window.location.href = '/'

  };

  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Entrar el email y password en el formulario.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">  

          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"  

            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"   

            required
            value={password}
            onChange={(event)  => setPassword(event.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button  color="primary" className="w-full" onClick={handleSubmit}>
          Entrar
        </Button>
      </CardFooter>
    </Card>
    </div>

  );

}




