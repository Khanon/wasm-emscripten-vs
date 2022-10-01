# CMakeList.txt : CMake project for html-emcc, include source and define
# project specific logic here.
#
cmake_minimum_required (VERSION 3.8)

project ("html-emcc")

# Add source to this project's executable.
add_executable (html-emcc "html-emcc.cpp" "html-emcc.h")

# Add emscripten include directory
target_include_directories(html-emcc PUBLIC "C:/Proyectos/_compilers/emsdk/upstream/emscripten/cache/sysroot/include")

## Add Emscripten HTML Test Page
set(CMAKE_EXECUTABLE_SUFFIX .html)

if (CMAKE_VERSION VERSION_GREATER 3.12)
  set_property(TARGET html-emcc PROPERTY CXX_STANDARD 20)
endif()

# TODO: Add tests and install targets if needed.
