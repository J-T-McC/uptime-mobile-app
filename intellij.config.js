//let intellij ide detect our aliased paths
//this should mirror the babel module-resolver alias'
System.config({
  "paths": {
    "@/*": "./*"
  }
});