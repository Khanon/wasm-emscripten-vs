// webpack-emcc.cpp : Defines the entry point for the application.

#include <stdio.h>
#include <stdlib.h>
#include <string>
#include <emscripten/html5.h>

void (*updateTimer)(int) = 0;
int startTimer = emscripten_get_now();

EM_BOOL loop(double time, void* userData)
{
    if (updateTimer)
    {
        updateTimer(emscripten_get_now() - startTimer);
    }
    else
    {
        printf("No registered function\n");
    }

    return EM_TRUE;
}

extern "C"
{
    void registerFunctionPointer_updateTimer(char* id)
    {
        updateTimer = reinterpret_cast<void (*)(int)>(atoi(id));
    }

    unsigned int const* convertStringToAscii(char* text)
    {
        std::string str(text);
        unsigned int* ptr = (unsigned int*)malloc(str.size());

        for (int i = 0; i < str.size(); i++)
        {
            ptr[i] = int(text[i]);
        }

        return ptr;
    }
}

int main() {
    printf("Hello emscripten from C++\n");

    // Run main loop
    emscripten_request_animation_frame_loop(loop, 0);

    return 0;
}