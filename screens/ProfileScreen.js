import React from 'react'
import FormProfile from '../components/profile/FormProfile'
import { useAuthContext } from '../context/AuthContext';
import { Routes } from '../routes/Routes';
import { CommonActions, useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {

  return (
    <FormProfile />
  )
} 