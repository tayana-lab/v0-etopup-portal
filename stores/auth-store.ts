import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  hasHydrated: boolean
  login: (mobileNumber: string, password: string) => Promise<boolean>
  logout: () => void
  setUser: (user: User) => void
  setHasHydrated: (state: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      hasHydrated: false,

      login: async (mobileNumber: string, password: string) => {
        set({ isLoading: true })

        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (mobileNumber === "2625000" && password === "password123") {
          const user: User = {
            id: "1",
            name: "John Doe",
            email: "dealer@etopup.sc",
            role: "Senior Agent",
          }

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          })
          return true
        }

        set({ isLoading: false })
        return false
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        })
      },

      setUser: (user: User) => {
        set({ user, isAuthenticated: true })
      },

      setHasHydrated: (state: boolean) => {
        set({ hasHydrated: state })
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    },
  ),
)
