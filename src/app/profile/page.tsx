
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage, Badge, Button, Card, CardContent } from '@/components';
import { Edit, PlusIcon, Settings, Star, Users } from 'lucide-react';
import { getUserByEmail } from '@/actions';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/login');
  }

  const {ok, message, user} = await getUserByEmail(session.user.email!);
  if (!ok) {
    console.error(message);
    redirect('/auth/login');
  }

  return (
    <div className="w-full px-4 py-6 md:px-6">
      <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit className="mr-2 size-4" />
            Edit Profile
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 size-4" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card className="p-0">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <Avatar className="size-20">
                  <AvatarImage
                    src={user?.image ?? 'https://github.com/shadcn.png'}
                    alt="User Avatar"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-lg font-semibold">{ user?.name }</h2>
                <p className="text-muted-foreground text-sm">
                { user?.email }
                </p>
                <Badge variant="secondary">Lvl {user?.level}</Badge>
                <Button className="mt-4 w-full" size="sm">
                  <PlusIcon className="mr-2 size-4" />
                  Follow
                </Button>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Member since</span>
                  <span>{user?.createdAt.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last active</span>
                  <span>2 hours ago</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Role</span>
                  <span>Admin</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-6 md:col-span-3">
          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="p-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 rounded-lg p-2">
                    <Star className="text-primary size-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">128</p>
                    <p className="text-muted-foreground text-sm">
                      Bets
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="p-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 rounded-lg p-2">
                    <Users className="text-primary size-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">8.5k</p>
                    <p className="text-muted-foreground text-sm">
                      Followers
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="p-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 rounded-lg p-2">
                    <Star className="text-primary size-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">99%</p>
                    <p className="text-muted-foreground text-sm">
                      Win Rate
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="p-0">
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-semibold">Recent Activity</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 border-b pb-4 last:border-0"
                  >
                    <div className="bg-muted rounded-full p-2">
                      <Star className="text-muted-foreground size-4" />
                    </div>
                    <div>
                      <p className="text-sm">
                        Completed project &quot;Dashboard UI&quot;
                      </p>
                      <p className="text-muted-foreground text-xs">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
