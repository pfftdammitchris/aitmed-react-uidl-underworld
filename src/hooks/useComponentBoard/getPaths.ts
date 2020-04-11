import { UIDLComponent } from '@aitmed/react-uidl'

function getPaths(
  currentPath: string,
  components: UIDLComponent[],
  paths?: Record<string, string>,
) {
  if (Array.isArray(components)) {
    let path
    for (let index = 0; index < components.length; index++) {
      const component = components[index]
      path = `${currentPath}[${index}]`
      if (!paths) paths = {}
      paths[component.componentId as string] = path
      if (Array.isArray(component.children)) {
        getPaths(`${path}.children`, component.children, paths)
      }
    }
  }
  return paths
}

export default getPaths
