# CMakeList.txt : CMake project for wasm-cmake, include source and define
# project specific logic here.
#
cmake_minimum_required (VERSION 3.8)

project ("wasm-cmake")

# Add source to this project's executable.
add_executable (wasm-cmake "wasm-cmake.cpp" "wasm-cmake.h")

# Add emscripten include directory
target_include_directories(wasm-cmake PUBLIC "Path.To/emsdk/upstream/emscripten/cache/sysroot/include")

if (CMAKE_VERSION VERSION_GREATER 3.12)
  set_property(TARGET wasm-cmake PROPERTY CXX_STANDARD 20)
endif()

# TODO: Add tests and install targets if needed.
