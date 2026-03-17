# Restore taint-related methods as no-ops for Ruby 3.2+ compatibility.
# The taint mechanism was removed but older gems (Liquid 4.x, Jekyll 3.x) still call these.
class Object
  unless method_defined?(:untaint)
    def untaint
      self
    end
  end

  unless method_defined?(:taint)
    def taint
      self
    end
  end

  unless method_defined?(:tainted?)
    def tainted?
      false
    end
  end
end
