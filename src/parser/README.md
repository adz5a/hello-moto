# README

### Monad

```
class Monad m where
( >>= ) :: m a -> ( a -> m b ) -> m b ## bind
( >> ) :: m a -> m b -> m b
return :: a -> m a ## unit
fail :: String -> m a
```
