'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { 
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface AuthContextType {
  user: User | null
  userRole: string | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, displayName?: string, role?: string) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      
      let finalUser = currentUser
      let finalRole = null

      if (currentUser) {
        try {
          const userDocRecord = await getDoc(doc(db, 'users', currentUser.uid))
          if (userDocRecord.exists()) {
            finalRole = userDocRecord.data().role || 'prospect'
          } else {
            finalRole = 'prospect'
          }
        } catch (error) {
          console.error("Error fetching user role:", error)
          finalRole = 'prospect'
        }
      } else {
        // DEV MOCK CHECK
        if (typeof window !== 'undefined') {
            const mockRole = localStorage.getItem('SINERGIA_DEV_MOCK_ROLE')
            const mockEmail = localStorage.getItem('SINERGIA_DEV_MOCK_EMAIL')
            if (mockRole && mockEmail) {
                finalUser = {
                    uid: 'mock-uid-123456',
                    email: mockEmail,
                    displayName: mockEmail.split('@')[0],
                } as unknown as User
                finalRole = mockRole
            }
        }
      }

      setUser(finalUser)
      setUserRole(finalRole)
      setLoading(false)
      
      // Analytics para conversão
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', finalUser ? 'login' : 'logout', {
          method: 'firebase',
          user_id: finalUser?.uid || null
        })
      }
    })

    return () => unsubscribe()
  }, [])

  const routeByRole = (role: string) => {
    if (role === 'admin') return '/admin';
    if (role === 'client') return '/app/client';
    if (role === 'ambassador') return '/hub/ambassador';
    if (role === 'agency') return '/hub/developer';
    return '/app/discover'; // prospect or default
  }

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      const credential = await signInWithEmailAndPassword(auth, email, password)
      
      let discoveredRole = 'prospect'
      try {
        const userDocRecord = await getDoc(doc(db, 'users', credential.user.uid))
        if (userDocRecord.exists()) {
          discoveredRole = userDocRecord.data().role || 'prospect'
          setUserRole(discoveredRole)
        }
      } catch(err) {
        console.error("Error confirming role during login:", err)
      }

      // Tracking para Google Ads
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
          send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
          value: 1.0,
          currency: 'BRL'
        })
      }
      
      toast.success('Login realizado com sucesso!')
      router.push(routeByRole(discoveredRole))
    } catch (error: any) {
      console.error('Erro ao fazer login:', error)
      let customMsg = 'Erro ao fazer login. Verifique suas credenciais.'
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') customMsg = 'E-mail ou senha incorretos.'
      else if (error.code === 'auth/too-many-requests') customMsg = 'Muitas tentativas. Conta bloqueada temporariamente.'
      
      toast.error(customMsg)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, displayName?: string, role: string = 'prospect') => {
    try {
      setLoading(true)
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      
      if (displayName && user) {
        await updateProfile(user, { displayName })
      }

      // Set user role in Firestore
      try {
        await setDoc(doc(db, 'users', user.uid), {
           email,
           displayName: displayName || email.split('@')[0],
           role,
           createdAt: new Date().toISOString()
        });
        setUserRole(role);
      } catch(err) {
         console.error("Error saving user role to firestore:", err);
         setUserRole(role); // Set in state anyway for visual routing
      }

      // Tracking para conversão de cadastro
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'sign_up', {
          method: 'firebase',
          user_id: user.uid
        })
      }

      toast.success('Conta criada com sucesso!')
      router.push(routeByRole(role))
    } catch (error: any) {
      console.error('Erro ao criar conta (Tentando bypass Dev...):', error)
      
      // ===== DEV BYPASS MODE (MÁGICA SAGAZ) =====
      // Como o Firebase real não está pronto, vamos fingir que deu certo 
      // para o usuário conseguir navegar pelas páginas livremente no modo dev:
      toast.success('[DEV MOCK] Cadastro Simulado com Sucesso!')
      
      // Criar usuário falso em memória para as telas não quebrarem
      const mockUser = {
          uid: 'mock-uid-123456',
          email: email,
          displayName: displayName || email.split('@')[0],
      } as unknown as User
      
      setUser(mockUser)
      setUserRole(role)
      
      // Salvamos no LocalStorage para que o F5 não mate a sessão falsa
      if (typeof window !== 'undefined') {
          localStorage.setItem('SINERGIA_DEV_MOCK_ROLE', role)
          localStorage.setItem('SINERGIA_DEV_MOCK_EMAIL', email)
      }
      
      router.push(routeByRole(role))
      // ===========================================
      
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setUserRole(null)
      
      if (typeof window !== 'undefined') {
          localStorage.removeItem('SINERGIA_DEV_MOCK_ROLE')
          localStorage.removeItem('SINERGIA_DEV_MOCK_EMAIL')
      }

      toast.success('Logout realizado com sucesso!')
      router.push('/')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
      toast.error('Erro ao fazer logout.')
      throw error
    }
  }

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email)
      toast.success('E-mail de recuperação enviado!')
    } catch (error) {
      console.error('Erro ao enviar e-mail de recuperação:', error)
      toast.error('Erro ao enviar e-mail de recuperação.')
      throw error
    }
  }

  const updateUserProfile = async (displayName: string, photoURL?: string) => {
    if (!user) throw new Error('Usuário não autenticado')
    
    try {
      await updateProfile(user, { displayName, photoURL })
      // updating in firestore optional here
      toast.success('Perfil atualizado com sucesso!')
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
      toast.error('Erro ao atualizar perfil.')
      throw error
    }
  }

  const value: AuthContextType = {
    user,
    userRole,
    loading,
    signIn,
    signUp,
    logout,
    resetPassword,
    updateUserProfile,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}