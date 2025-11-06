"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function Footer() {
  const [showAdminModal, setShowAdminModal] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [hoverPerson, setHoverPerson] = useState<string | null>(null)
  const [openPerson, setOpenPerson] = useState<string | null>(null)

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Simple hardcoded admin credentials
      if (username === "admin" && password === "admin123") {
        // Store admin token in localStorage
        localStorage.setItem("admin_token", "admin_authenticated_" + Date.now())
        setShowAdminModal(false)
        setUsername("")
        setPassword("")
        router.push("/admin")
      } else {
        setError("Username yoki parol noto'g'ri")
      }
    } catch (err) {
      setError("Kirish xatosi yuz berdi")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <footer className="bg-gray-50 border-t mt-auto py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <p className="text-sm text-gray-600">© 2025 PIRLS. Barcha huquqlar himoyalangan.</p>

              <div className="text-sm text-gray-700 flex items-center gap-2">
                <span>Testni tuzdi:</span>
                <div className="relative">
                  <button
                    onMouseEnter={() => setHoverPerson("person")}
                    onMouseLeave={() => setHoverPerson((h) => (h === "person" ? null : h))}
                    onClick={() => setOpenPerson("person")}
                    className="text-sm text-[#0ea5a4] hover:underline"
                  >
                    Eism Sharif
                  </button>

                  {/* hover popover for person */}
                  {hoverPerson === "person" && (
                    <div className="absolute bottom-10 left-0 z-50 w-[360px] bg-white border rounded-lg shadow-lg p-4 text-left">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-[#10B981]">
                            <Image src="/per.jpg" alt="Eism Sharif" width={160} height={160} className="object-cover" />
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">Jumaniyozova Roxila Roʻzimboyevna</div>
                          <div className="text-sm text-gray-600 mt-1">Xorazm viloyati Pedagogik mahorat markazi</div>
                          <div className="text-xs text-gray-500 mt-2">Metodik xizmat ko’rsatish bo’limi, boshlang’ich ta’lim metodisti</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <span className="text-gray-500">va</span>

                <div className="relative">
                  <button
                    onMouseEnter={() => setHoverPerson("pertwo")}
                    onMouseLeave={() => setHoverPerson((h) => (h === "pertwo" ? null : h))}
                    onClick={() => setOpenPerson("pertwo")}
                    className="text-sm text-[#0ea5a4] hover:underline"
                  >
                    Ism Sharif
                  </button>

                  {/* hover popover for pertwo */}
                  {hoverPerson === "pertwo" && (
                    <div className="absolute bottom-10 left-0 z-50 w-[360px] bg-white border rounded-lg shadow-lg p-4 text-left">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-[#10B981]">
                            <Image src="/pertwo.jpg" alt="Raximova Zulayho" width={160} height={160} className="object-cover" />
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">Raximova Zulayho Baxodirovna</div>
                          <div className="text-sm text-gray-600 mt-1">Xorazm viloyati Qoʻshkoʻpir tumani 19-son umumiy oʻrta ta’lim maktabi</div>
                          <div className="text-xs text-gray-500 mt-2">Boshlangʻich ta’lim fani oʻqituvchisi</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowAdminModal(true)}
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              Admin Login
            </button>
          </div>
        </div>
      </footer>

      {/* Person detail dialogs (click) */}
      <Dialog open={openPerson === "person"} onOpenChange={(open) => !open && setOpenPerson(null)}>
        <DialogContent className="w-full max-w-md">
          <DialogHeader>
            <DialogTitle>Jumaniyozova Roxila Roʻzimboyevna</DialogTitle>
            <DialogDescription>Xorazm viloyati Pedagogik mahorat markazi</DialogDescription>
          </DialogHeader>
          <div className="flex gap-6 items-start mt-2">
            <div className="flex-shrink-0">
              <Image src="/per.jpg" alt="Eism Sharif" width={640} height={480} className="object-contain rounded" />
            </div>
            <div>
              <p className="font-medium">Jumaniyozova Roxila Roʻzimboyevna</p>
              <p className="text-sm text-gray-600">Xorazm viloyati Pedagogik mahorat markazi metodik xizmat ko’rsatish bo’limi boshlang’ich ta’lim metodisti</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openPerson === "pertwo"} onOpenChange={(open) => !open && setOpenPerson(null)}>
        <DialogContent className="w-full max-w-md">
          <DialogHeader>
            <DialogTitle>Raximova Zulayho Baxodirovna</DialogTitle>
            <DialogDescription>Qoʻshkoʻpir tumani 19-son maktabi</DialogDescription>
          </DialogHeader>
          <div className="flex gap-6 items-start mt-2">
            <div className="flex-shrink-0">
              <Image src="/pertwo.jpg" alt="Raximova Zulayho" width={640} height={480} className="object-contain rounded" />
            </div>
            <div>
              <p className="font-medium">Raximova Zulayho Baxodirovna</p>
              <p className="text-sm text-gray-600">Xorazm viloyati Qoʻshkoʻpir tumani 19-son umumiy oʻrta ta’lim maktabining boshlangʻich ta’lim fani oʻqituvchisi</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Admin Login Modal */}
      <Dialog open={showAdminModal} onOpenChange={setShowAdminModal}>
        <DialogContent className="w-full max-w-md">
          <DialogHeader>
            <DialogTitle>Admin Paneli</DialogTitle>
            <DialogDescription>Admin akauntiga kirish</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-username">Username</Label>
              <Input
                id="admin-username"
                type="text"
                placeholder="Username kiriting"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="admin-password">Parol</Label>
              <Input
                id="admin-password"
                type="password"
                placeholder="Parol kiriting"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white" disabled={isLoading}>
              {isLoading ? "Kuting..." : "Kirish"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
