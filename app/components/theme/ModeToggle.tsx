import { Moon, Sun } from 'lucide-react';
import { Theme, useTheme } from 'remix-themes';
import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const [theme, setTheme] = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK)}
      aria-label="Toggle theme"
    >
      {theme === Theme.DARK ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
}
